import UsersRepository from "./usersRepository.js";

const repositories = {
  users: UsersRepository,
  //other Repos
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
