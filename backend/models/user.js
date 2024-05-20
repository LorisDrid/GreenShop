const userSchema = {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    // Autres champs si nécessaire
  };
  
  module.exports = userSchema;