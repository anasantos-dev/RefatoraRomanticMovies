import { MovieRepository } from "../../../application/repositories/movie-repository";
import { Movie } from "../../../domain/movie";
import { MovieModel } from "./model";

export class Repository implements MovieRepository {
  async save(movie: Movie): Promise<void> {
    const newMovie = new MovieModel(movie);
    await newMovie.save();
  }
//async findAll (): Promise<Movie[]> {
 // return await MovieModel.find();
//}
}
