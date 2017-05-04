require 'set'

class ImportDatasourceJob < ActiveJob::Base
  def perform(file, db_id)
    import(file, db: Datasource.find(db_id))
  end

  private

  def import(file, db:)
    author_names = Set.new
    json = JSON.parse(file)
    hash = {}
    parents = {}

    json['parts'].each do |part_json|
      part_id   = part_json.delete('id')
      parent_id = part_json.delete('parent_id')
      part = Part.new(part_json)
      part.datasource = db
      begin
        part.save!
        hash[part_id] = part.id
        parents[part_id] = parent_id if parent_id != nil
      rescue StandardError => e
        db.parts.delete_all
        db.delete
        raise e
      end
    end

    parents.each_pair do |old_child_id, old_parent_id|
      new_child_id = hash[old_child_id]
      new_parent_id = hash[old_parent_id]
      Part.find(new_child_id).update_attribute(:parent_id, new_parent_id)
    end

    json['comments'].each do |comment_json|
      comment_json.delete('id')
      comment = Comment.new(comment_json)
      comment.datasource = db
      comment.author_id = Digest::MD5.hexdigest(comment.author_name)
      author_names << comment.author_name
      comment.author_id = author_names.find_index(comment.author_name)
      comment.part_id = hash[comment_json['part_id']]
      begin
        comment.save!
      rescue StandardError => e
        db.comments.delete_all
        db.parts.delete_all
        db.delete
        raise e
      end
    end
  end
end
