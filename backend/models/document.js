const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idDoc: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idDoc"
    },
    titreDoc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "titreDoc"
    },
    lienDoc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "lienDoc"
    },
    descreption: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descreption"
    },
    idEmp: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idEmp",
      references: {
        key: "idEmp",
        model: "employee_model"
      }
    },
    idForniss: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idForniss",
      references: {
        key: "idForniss",
        model: "fournisseur_model"
      }
    },
    idInterv: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idInterv",
      references: {
        key: "idInterv",
        model: "intervention_model"
      }
    },
    idDir: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idDir",
      references: {
        key: "idDir",
        model: "direction_model"
      }
    },
    dateSortie: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dateSortie"
    },
    idPro: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idPro",
      references: {
        key: "idPro",
        model: "project_model"
      }
    }
  };
  const options = {
    tableName: "document",
    comment: "",
    indexes: [{
      name: "idDir",
      unique: false,
      type: "BTREE",
      fields: ["idDir"]
    }, {
      name: "idEmp",
      unique: false,
      type: "BTREE",
      fields: ["idEmp"]
    }, {
      name: "idForniss",
      unique: false,
      type: "BTREE",
      fields: ["idForniss"]
    }, {
      name: "idInterv",
      unique: false,
      type: "BTREE",
      fields: ["idInterv"]
    }, {
      name: "idPro",
      unique: false,
      type: "BTREE",
      fields: ["idPro"]
    }]
  };
  const DocumentModel = sequelize.define("document_model", attributes, options);
  return DocumentModel;
};