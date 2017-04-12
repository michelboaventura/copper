require 'set'

class ImportDatabaseJob < ActiveJob::Base
  def perform(file, db_id)
    import(file, db: Database.find(db_id))
  end

  private

  def import(file, db:)
    author_names = Set.new
    json = JSON.parse(file)

    json['parts'].each do |part_json|
      part = Part.new(part_json)
      part.database = db
      begin
        part.save!
      rescue StandardError => e
        db.parts.delete_all
        db.delete
        raise e
      end
    end

    json['comments'].each do |comment_json|
      comment = Comment.new(comment_json)
      comment.database = db
      comment.author_id = Digest::MD5.hexdigest(comment.author_name)
      author_names << comment.author_name
      comment.author_id = author_names.find_index(comment.author_name)
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
