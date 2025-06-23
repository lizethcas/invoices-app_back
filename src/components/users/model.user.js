
import { DataTypes } from 'sequelize';
import sequelize from '../../config/postgress.js';
import bcrypt from 'bcrypt';

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID del usuario
 *              username:
 *                  type: string
 *                  description: Nombre de usuario
 *              email:
 *                  type: string
 *                  format: email
 *                  description: Email del usuario
 *              password:
 *                  type: string
 *                  format: password
 *                  description: Contraseña del usuario
 *              user_image:
 *                  type: string
 *                  description: URL de la imagen del usuario
 *              role:
 *                  type: string
 *                  enum: ["admin", "user"]
 *                  description: Rol del usuario
 *          required:
 *              - username
 *              - email
 *              - password
 *          example:
 *              message: "User created successfully"
 *              id: 1
 *              username: nuevousuario
 *              email: nuevousuario@ejemplo.com
 *              password: contraseña123
 *              user_image: https://ui-avatars.com/api/?name=nombre+apellido&background=0D8ABC&color=fff&bold=true
 *              role: user
 */
const user = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'El formato del correo es incorrecto'
      },
      notEmpty: {
        msg: 'El correo no puede estar vacío'
      },
      notNull: {
        msg: 'El correo no puede ser nulo'
      }
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
  user_image:{
    type: DataTypes.STRING,
    allowNull: false
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

//https://ui-avatars.com/api/?name=Liz+Castillo&background=0D8ABC&color=fff&bold=true