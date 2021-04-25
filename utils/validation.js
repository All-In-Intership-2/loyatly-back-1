const validationOptions = {
  email: {
    allow_display_name: true, 
    require_display_name: false, 
    allow_utf8_local_part: true, 
    require_tld: true, 
    allow_ip_domain: false, 
    domain_specific_validation: false, 
    blacklisted_chars: '' 
  },
  password: {
    minLength: 6, 
    minUppercase: 1, 
    minNumbers: 1,
    minSymbols: 0
  }
};

module.exports.validationOptions = validationOptions;