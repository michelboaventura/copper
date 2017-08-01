class PerformJob < ApplicationJob
  queue_as :default

  STOPWORDS = %w{a ao aos aquela aquelas aquele aqueles aquilo as ate com como
  da das de dela delas dele deles depois do dos e ela elas ele eles em entre era
  eram essa essas esse esses esta estamos estas estava estavam este esteja
  estejam estejamos estes esteve estive estivemos estiver estivera estiveram
  estiverem estivermos estivesse estivessem estiveramos estivessemos estou
  estavamos estao eu foi fomos for fora foram forem formos fosse fossem fui
  foramos fossemos haja hajam hajamos havemos havia hei houve houvemos houver
  houvera houveram houverei houverem houveremos houveria houveriam houvermos
  houverao houveriamos houvesse houvessem houveramos houvessemos ha hao isso
  isto ja lhe lhes mais mas me mesmo meu meus minha minhas muito na nas nem no
  nos nossa nossas nosso nossos num numa nao o os ou para pela pelas pelo pelos
  por qual quando que quem se seja sejam sejamos sem ser serei seremos seria
  seriam sera serao seriamos seu seus somos sou sua suas sao so tambem te tem
  temos tenha tenham tenhamos tenho ter terei teremos teria teriam tera terao
  teriamos teu teus teve tinha tinham tive tivemos tiver tivera tiveram tiverem
  tivermos tivesse tivessem tiveramos tivessemos tu tua tuas tinhamos um uma
  voce voces vos eramos}

  def perform(job_id)
    job = Job.find(job_id)
    job.update_attributes(status: 'RUNNING', started: Time.now)

    # We need to add a /i option to allow insensitive query and also need to
    # avoid any letter before the term on 'equal' search and on 'not equal'
    # search
    query = job.mongo_query.
      gsub(/{"text":"([^\"]*)"}/, '{"text":/[^a-zA-Z]\1/i}').
      gsub(/{"text":{"\$regex":"([^\"]*)"}}/, '{"text":/\1/i}').
      gsub(/{"\$ne":"([^\"]*)"}/, '{"$not": /\1/i}')

    filter = eval(query)
    datasource = job.datasource

    parts = datasource.parts
    part_ids = parts.pluck(:id)
    comments = datasource.comments.in(part_id: part_ids).where(filter)
    full_comments = datasource.comments.in(part_id: part_ids)
    terms = query.scan(/\/([^\/]*)\//).flatten.map{|s| s.gsub(/\[[^\]\[]*\]/, '')}

    if comments.empty?
      job.update_attributes(status: "EMPTY", finished: Time.now)
      return
    end

    path = Rails.root.join('data')
    Dir.mkdir(path) rescue nil

    path = Rails.root.join('data', job.id.to_s)
    Dir.mkdir(path) rescue nil

    comfile = File.join(path, 'comments.json')
    comwt = File.join(path, 'wt_comments.csv')
    comfilef = File.join(path, 'comments_filtered.json')
    fullcomfile = File.join(path, 'full_comments.json')
    fullcomfilef = File.join(path, 'full_comments_filtered.json')

    begin
      SaveTermsJob.new(terms, path).perform_now
      ExtractWtCommentsJob.new(comments, comwt, terms).perform_now
      ExtractCommentsJob.new(comments, comfile).perform_now
      ExtractCommentsJob.new(comments, comfilef, STOPWORDS).perform_now
      ExtractCommentsJob.new(full_comments, fullcomfile).perform_now
      ExtractCommentsJob.new(full_comments, fullcomfilef, STOPWORDS).perform_now
      CommentSearchJob.new(path).perform_now
      TextSearchJob.new(path, parts).perform_now
      SentimentoJob.new(path).perform_now
      CorrelacaoJob.new(path, datasource).perform_now
      CoocorrenciaJob.new(path).perform_now
      WordtreeJob.new(path).perform_now
      PartItemJob.new(path).perform_now
      TopicoJob.new(path).perform_now
    rescue
      job.update_attributes(status: 'ERROR', finished: Time.now)
    else
      job.update_attributes(status: 'COMPLETED', finished: Time.now)
    end
  end
end
