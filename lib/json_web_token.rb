class JsonWebToken
  ecdsa_key_pem = ENV['mj_ecdsa_key'] || File.open('lib/ecdsa_key','r').read rescue nil
  ecdsa_key = OpenSSL::PKey::EC.new ecdsa_key_pem
  class_variable_set(:@@ecdsa_key, ecdsa_key)
  ecdsa_public = OpenSSL::PKey::EC.new ecdsa_key
  ecdsa_public.private_key = nil
  class_variable_set(:@@ecdsa_public, ecdsa_public)

  class << self
    def encode(payload, exp = 240.hours.from_now)
      payload[:expiration] = exp.to_i
      return { access_token: JWT.encode(payload, @@ecdsa_key, 'ES512'), expiration: payload[:expiration]}
    end

    def decode(token)
      body = JWT.decode(token, @@ecdsa_public, true, { :algorithm => 'ES512' })[0]
      HashWithIndifferentAccess.new body
    rescue
      nil
    end
  end
end
