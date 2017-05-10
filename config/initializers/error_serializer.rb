module ErrorSerializer

  def ErrorSerializer.serialize(errors)
    return if errors.nil?

    json = {}
    new_array = errors.map do |attribute, detail|
      {detail: detail, source: { pointer: 'data/attributes/' + attribute.to_s}}
    end.flatten
    json[:errors] = new_array
    json
  end
end
