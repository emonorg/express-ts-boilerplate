import * as mongoose from 'mongoose';

export function connectToMongoDatabase() {
  const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
      MONGO_DATABASE,
   } = process.env;
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}/${MONGO_DATABASE}?authSource=admin`, 
                   { useNewUrlParser: true,  useUnifiedTopology: true  },
   ).then(() => {
     console.log('MongoDB connected successfully!');
   });
}