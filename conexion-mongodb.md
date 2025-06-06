# Conexión a MongoDB desde Node.js

## Introducción

MongoDB es una base de datos NoSQL orientada a documentos que almacena datos en formato BSON (Binary JSON). Es muy popular en aplicaciones Node.js por su flexibilidad y facilidad de uso con JavaScript.

## Instalación de dependencias

Para conectar tu aplicación Node.js a MongoDB, necesitas instalar el driver oficial de MongoDB o Mongoose (un ODM que facilita el trabajo con MongoDB):

```bash
# Usando el driver nativo de MongoDB
npm install mongodb

# O usando Mongoose (recomendado)
npm install mongoose
```

## Conexión básica con el driver nativo de MongoDB

```javascript
// src/config/database.js
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/invoices';
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    return client.db('invoices');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export const closeDB = async () => {
  try {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  } catch (error) {
    console.error('Error al cerrar la conexión:', error);
  }
};
```

## Conexión con Mongoose (recomendado)

```javascript
// src/config/database.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/invoices';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado de MongoDB');
});

// Cierre adecuado en caso de terminación de la aplicación
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexión a MongoDB cerrada por terminación de la aplicación');
  process.exit(0);
});
```

## Integración en tu aplicación Express

```javascript
// src/app.js
import express from 'express';
import { connectDB } from './config/database.js';
import invoiceRoutes from './components/invoices/routes.invoices.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos antes de iniciar el servidor
connectDB()
  .then(() => {
    // Middleware
    app.use(express.json());
    
    // Rutas
    app.use('/api/invoices', invoiceRoutes);
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo iniciar la aplicación:', err);
    process.exit(1);
  });
```

## Definición de modelos con Mongoose

```javascript
// src/components/invoices/model.mongoose.js
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: [true, 'El nombre del cliente es obligatorio'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'El monto es obligatorio'],
    min: [0, 'El monto no puede ser negativo']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'paid', 'cancelled'],
      message: '{VALUE} no es un estado válido'
    },
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
  versionKey: false // Elimina el campo __v
});

// Índices para mejorar el rendimiento
invoiceSchema.index({ customer: 1 });
invoiceSchema.index({ status: 1 });

// Métodos personalizados
invoiceSchema.methods.isPaid = function() {
  return this.status === 'paid';
};

// Método estático
invoiceSchema.statics.findByCustomer = function(customerName) {
  return this.find({ customer: new RegExp(customerName, 'i') });
};

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
```

## Operaciones CRUD con Mongoose

```javascript
// src/components/invoices/service.invoices.js
import Invoice from './model.mongoose.js';

// Crear una factura
export const createInvoice = async (invoiceData) => {
  try {
    const newInvoice = new Invoice(invoiceData);
    return await newInvoice.save();
  } catch (error) {
    throw error;
  }
};

// Obtener todas las facturas
export const getAllInvoices = async () => {
  try {
    return await Invoice.find();
  } catch (error) {
    throw error;
  }
};

// Obtener una factura por ID
export const getInvoiceById = async (id) => {
  try {
    return await Invoice.findById(id);
  } catch (error) {
    throw error;
  }
};

// Actualizar una factura
export const updateInvoice = async (id, updates) => {
  try {
    return await Invoice.findByIdAndUpdate(id, updates, { 
      new: true, // Devuelve el documento actualizado
      runValidators: true // Ejecuta validadores de esquema
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar una factura
export const deleteInvoice = async (id) => {
  try {
    return await Invoice.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
```

## Uso en controladores

```javascript
// src/components/invoices/controller.invoices.js
import * as invoiceService from './service.invoices.js';

// Obtener todas las facturas
export const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// Obtener una factura por ID
export const getInvoiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invoice = await invoiceService.getInvoiceById(id);
    
    if (!invoice) {
      return res.status(404).json({ mensaje: 'Factura no encontrada' });
    }
    
    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};

// Crear una factura
export const createInvoice = async (req, res, next) => {
  try {
    const invoiceData = req.body;
    const newInvoice = await invoiceService.createInvoice(invoiceData);
    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
};
```

## Configuración con variables de entorno

Es recomendable usar variables de entorno para la configuración de la base de datos:

```javascript
// .env
MONGODB_URI=mongodb://usuario:contraseña@localhost:27017/invoices?authSource=admin

// src/config/database.js
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
```

## Opciones de conexión avanzadas

```javascript
// src/config/database.js
import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4, // Usar IPv4, omitir para permitir IPv6
  maxPoolSize: 10 // Máximo de conexiones simultáneas
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};
```

## Consultas avanzadas

```javascript
// Filtrar por estado y ordenar por monto
const getPendingInvoices = async () => {
  return await Invoice.find({ status: 'pending' })
    .sort({ amount: -1 })
    .select('customer amount dueDate');
};

// Paginación
const getInvoicesPaginated = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const invoices = await Invoice.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    
  const total = await Invoice.countDocuments();
  
  return {
    invoices,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total
  };
};

// Búsqueda por texto
const searchInvoices = async (searchTerm) => {
  return await Invoice.find({
    $or: [
      { customer: new RegExp(searchTerm, 'i') },
      { status: new RegExp(searchTerm, 'i') }
    ]
  });
};
```

## Manejo de errores

```javascript
// Middleware para manejar errores de MongoDB
export const handleMongoErrors = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // Error de validación de Mongoose
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }
  
  if (err.name === 'CastError') {
    // Error de formato de ID
    return res.status(400).json({ 
      error: 'ID de formato inválido' 
    });
  }
  
  if (err.code === 11000) {
    // Error de duplicado (índice único)
    return res.status(400).json({ 
      error: 'Ya existe un registro con esos datos' 
    });
  }
  
  // Otros errores
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
};
```

## Transacciones en MongoDB

Para operaciones que requieren consistencia entre múltiples documentos:

```javascript
import mongoose from 'mongoose';

const transferFunds = async (fromAccountId, toAccountId, amount) => {
  // Iniciar sesión
  const session = await mongoose.startSession();
  
  try {
    // Iniciar transacción
    session.startTransaction();
    
    // Realizar operaciones
    const fromAccount = await Account.findByIdAndUpdate(
      fromAccountId,
      { $inc: { balance: -amount } },
      { session, new: true }
    );
    
    if (fromAccount.balance < 0) {
      // Revertir si el balance es negativo
      throw new Error('Fondos insuficientes');
    }
    
    await Account.findByIdAndUpdate(
      toAccountId,
      { $inc: { balance: amount } },
      { session }
    );
    
    // Confirmar transacción
    await session.commitTransaction();
    
    return { success: true };
  } catch (error) {
    // Revertir en caso de error
    await session.abortTransaction();
    throw error;
  } finally {
    // Finalizar sesión
    session.endSession();
  }
};
```

## Resumen

1. **Instala las dependencias**: `mongoose` o el driver nativo `mongodb`
2. **Configura la conexión**: Crea un archivo de configuración con la URI y opciones
3. **Define modelos**: Crea esquemas para tus datos con validaciones
4. **Implementa servicios**: Crea funciones para operaciones CRUD
5. **Usa en controladores**: Integra los servicios en tus controladores Express
6. **Maneja errores**: Implementa middleware para errores específicos de MongoDB
7. **Usa variables de entorno**: Para credenciales y configuración sensible
