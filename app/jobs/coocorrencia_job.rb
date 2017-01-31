class CoocorrenciaJob < ApplicationJob
  queue_as :default

  def perform(path)
    min_support = 50
    IO.popen([
      Rails.root.join('algorithms', 'coocorrencia', 'run_coocorrencia.sh').to_s,
      path.join('comments.json').to_s,
      min_support.to_s
    ]) do |io|
      File.open(File.join(path, 'coocorrencia'), 'w') do |f|
        f << io.read
      end
    end
    build_coocorrencia_json(path)
  end

  private

  def build_coocorrencia_json(path)
    out = {
      nodes: Set.new,
      links: []
    }
    File.open(File.join(path, 'coocorrencia'), 'r').each_line do |line|
      src, target, value = line.strip.split(" ")
      out[:nodes] << json_coocorrencia(src)
      out[:nodes] << json_coocorrencia(target)
      out[:links] << {source: src, target: target, value: value, weight: value}
    end

    File.open(File.join(path, 'graph-canvas.json'), 'w') do |f|
      f << out.to_json
    end
  end

  def json_coocorrencia(el)
    {
      id: el,
      name: el,
      attrs: {},
      metric: 0,
      group: "",
      community: 0,
      neighbours: {}
    }
  end
end
