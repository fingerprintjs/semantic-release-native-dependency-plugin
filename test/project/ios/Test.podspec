Pod::Spec.new do |s|
  s.name         = "RNFingerprintjsPro"

  s.dependency "React-Core"
  s.dependency "FingerprintPro", '>= 1.2.3', '< 4.5.6'
end