import mongoose from 'mongoose';
import 'dotenv/config';

// "mongodb+srv://cluster0.oiujt0k.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const jokeSchema = mongoose.Schema({
    category: { type: String, required: true },
    setup: { type: String, required: true },
    delivery: { type: String, required: true },
    safe: { type: Boolean, required: true },
    recs: {type: Number, required: true }
});

const Joke = mongoose.model("Joke", jokeSchema);

const createJoke = async (category, setup, delivery, safe, recs) => {
    const joke = new Joke({ category: category, setup: setup, delivery: delivery, safe: safe, recs: recs });
    return joke.save();
};

const findJokes = async (filter) => {
    const query = Joke.find(filter);
    return query.exec();
};

const findJokeById = async (_id) => {
    const query = Joke.findById(_id);
    return query.exec();
};

const incrementJoke = async (_id, category, setup, delivery, safe, recs) => {
    const result = await Joke.replaceOne({ _id: _id }, { category: category, setup: setup, delivery: delivery, safe: safe, recs: recs });
    return result.modifiedCount;
};

const deleteById = async (_id) => {
    const deletion = await Joke.deleteMany({ _id: _id });
    return deletion.deletedCount;
}

export { createJoke, findJokes, findJokeById, incrementJoke, deleteById };