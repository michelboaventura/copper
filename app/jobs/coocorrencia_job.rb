class CoocorrenciaJob < ApplicationJob
  MAX_NODES = 350
  queue_as :default

  def perform(path)

    #Full data
    run_algorithm(
      path.join('full_comments_filtered.json').to_s,
      path.join('coocorrencia_full').to_s,
      path.join('terms').to_s,
      path.join('graph-canvas-full.json').to_s
    )

    #Filtered data
    run_algorithm(
      path.join('comments_filtered.json').to_s,
      path.join('coocorrencia').to_s,
      path.join('terms').to_s,
      path.join('graph-canvas.json').to_s
    )
  end

  private

  def run_algorithm(input, output, terms, final_result)
    min_support = 20
    IO.popen([
      Rails.root.join('algorithms', 'coocorrencia', 'run_coocorrencia.sh').to_s,
      input,
      min_support.to_s
    ]) do |io|
      File.open(output, 'w') do |f|
        f << io.read
      end
    end
    build_coocorrencia_json(output, terms, final_result)
  end

  def build_coocorrencia_json(input, terms, output)
    out = {
      nodes: Set.new,
      links: []
    }
    nodes = {}

    terms = File.read(terms).strip.split("|")

    file = File.open(input, 'r')

    file.each_line do |line|
      break if line == "FREQ\n"

      src, target, value = line.strip.split(" ")
      out[:links] << {source: src, target: target, value: value, weight: value}
    end

    file.each_line do |line|
      break if line == "NEIG\n"

      el, acc = line.strip.split(" ")

      nodes[el] = {}
      nodes[el][:acc] = acc
    end

    file.each_line do |line|
      els = line.chomp.split(" ")
      el = els.delete_at(0)

      nodes[el][:neigh] = els.inject({}) {|acc, e| acc[e] = true; acc}
    end

    nodes.each_pair do |el, value|
      out[:nodes] << json_coocorrencia(el, value[:acc], value[:neigh], terms)
    end

    if out[:nodes].size > MAX_NODES
      out = {
        nodes: [],
        links: [],
        msg: "Sua consulta retornou um número muito grande de nós e não pôde ser exibida. Realize uma consulta mais restritiva para usar esta visualização."
      }
    end

    File.open(output, 'w') do |f|
      f << out.to_json
    end
  end

  def json_coocorrencia(el, count, neigh, terms)
    json = {
      id: el,
      name: el,
      attrs: {},
      metric: count,
      group: "",
      community: 0,
      neighbours: neigh
    }
    json[:centered] = true if terms.any?{|term| el[term]}

    json
  end
end
