require 'openssl'

ecdsa_key = OpenSSL::PKey::EC.new 'secp521r1'
ecdsa_key.generate_key

ecdsa_key_file = File.new('lib/ecdsa_key', 'w')
ecdsa_key_file.puts ecdsa_key.to_pem
ecdsa_key_file.close
