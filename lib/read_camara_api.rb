#!/bin/env ruby
require 'json'
require 'rest-client'
require 'pry'

def get_all(domain, url, **params)
  data = []
  params = {limit: 1000}.merge(params)

  loop do
    puts "GET #{domain}#{url} | #{params.to_json}"

    json = JSON.parse RestClient.get(domain + url, {params: params}).body

    meta = json.delete('meta')
    objects = json.delete('objects')

    #A single entity
    if meta.nil? && objects.nil?
      return json
    else
      data += objects
    end

    unless url = meta['next']
      break
    end
  end
  return data
end

def download(id = 63)
  domain   = "https://edemocracia.camara.leg.br"
  part_url = "/wikilegis/api/v1/billsegment/"

  # Pegando parts
  parts = get_all(domain, part_url, bill__id: id)

  puts "Got #{parts.count} parts"
  puts "Getting comments"

  parts.each do |part|
    part['comments'].map!{ |comment| get_all(domain, comment) }
  end

  File.open("raw.json", "w") do |f|
    f << parts.to_json
  end
end

def generate_name(json)
  parent = json['parent']
  parents_name = []

  if parent
    parents_name << generate_name(parent)
  end

  parents_name << json['segment_type']['presentation_name'] + " #{json['number']}"
  parents_name.join(", ")
end

def generate_member(parent)
  loop do
    if parent2 = parent['parent']
      parent = parent2
    else
      return parent['number'].to_s
    end
  end
end

def generate_database
  parts = JSON.parse(File.read("raw.json"))
  #Gerando formato do data_explorer
  output = {
    parts: [],
    comments: []
  }

  parts.each do |part|
    out_part = {
      id: part['id'],
      parent_id: part.dig('parent', 'id'),
      type: part['segment_type']['presentation_name'],
      text: part['content'],
      name: generate_name(part),
      member: generate_member(part),
      category: '0',
    }

    output[:parts] << out_part

    part['comments'].each do |comment|
      output[:comments] << {
        id: comment['id'],
        parent_id: nil,
        text: comment['text'],
        date: comment['created'],
        author_name: comment['author']['username'],
        part_id: comment['object_id'],
        author_id: comment['author']['id']
      }
    end
  end

  File.open("database.json", "w") do |f|
    f << output.to_json
  end
end

if id = ARGV[0]
  download(id)
end

generate_database
