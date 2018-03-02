module.exports = function(sequelize, DataTypes) {
  var Contact = sequelize.define("Contact", {
    // Giving the Contact model a name of type STRING
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // Giving the Contact model a name of type BOOLEAN
    gender: {
      type: DataTypes.BOOLEAN
    },
    // Giving the Contact model an email of type STRING
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // Giving the Contact model a phone of type STRING
    phone: {
      type: DataTypes.STRING,
      validate: {
        len:[10,20]
      }
    }
  });

  Contact.associate = function(models) {
    // We're saying that a Contact should belong to a Company
    // A Contact can't be created without a Company due to the foreign key constraint
    Contact.belongsTo(models.Company, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Contact;
};