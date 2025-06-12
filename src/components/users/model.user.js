
import { DataTypes } from 'sequelize';
import sequelize from '../../config/postgress.js';
import bcrypt from 'bcrypt';

const user = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      msg: 'El formato del correo es incorrecto'
    },
    notEmpty: {
      msg: 'El correo no puede estar vacío'
    },
    notNull: {
      msg: 'El correo no puede ser nulo'
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 12],
        msg: 'La contraseña debe tener entre 6 y 12 caracteres'
      },
      notEmpty: {
        msg: 'La contraseña no puede estar vacía'
      },
      notNull: {
        msg: 'La contraseña no puede ser nula'
      }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  tableName: 'users',
  timestamps: true
});

user.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


export default user;