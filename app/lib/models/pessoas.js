Pessoas = new Mongo.Collection('pessoas');

Schemas.PessoasSchema = new SimpleSchema({
  
    endereco: {
      type: String
    },
  
    idade: {
      type: Number
    },
  
    nome: {
      type: String
    },
  
    admin: {
      type: Boolean
    },
  
 });
