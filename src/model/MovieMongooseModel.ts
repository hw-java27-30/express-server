import * as mongoose from "mongoose";

export const movieMongooseSchema = new mongoose.Schema({
    plot: {type: String, required: true},
    genres: {type: [String], required: true},
    runtime: {type: Number, required: true},
    rated: {type: String, required: true},
    cast: {type: [String], required: true},
    num_mflix_comments: {type: Number, required: false},
    poster: {type: String, required: false},
    title: {type: String, required: true},
    fullplot: {type: String, required: true},
    countries: {type: [String], required: true},
    released: {type: Date, required: true},
    directors: {type: [String], required: true},
    writers: {type: [String], required: true},
    awards: {
        type: {
            wins: {type: Number, required: true},
            nominations: {type: Number, required: true},
            text: {type: String, required: true},
        }, required: true
    },
    lastupdated: {type: String, required: false},
    year: {type: Number, required: true},
    imdb: {
        type: {
            rating: {type: Number, required: false},
            votes: {type: Number, required: false},
            id: {type: Number, required: false},
        }, required: false
    },
    type: {type: String, required: false},
    tomatoes: {
        type: {
            viewer: {
                type: {
                    rating: {type: Number, required: false},
                    numReviews: {type: Number, required: false},
                    meter: {type: Number, required: false}
                }, required: false
            },
            lastUpdated: {type: Date, required: false},
        },
        required: false
    }}, {strict: false});


export const movieMongooseSchema2 = new mongoose.Schema({}, {strict: false});

export const MovieMongooseModel = mongoose.model('Movies', movieMongooseSchema, 'movies');