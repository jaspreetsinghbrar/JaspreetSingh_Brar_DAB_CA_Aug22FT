const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

// Define the Animal model
const Animal = sequelize.define(
  "Animal",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the Temperament model
const Temperaments = sequelize.define(
  "Temperaments",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the Species model
const Species = sequelize.define(
  "Species",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the Size model
const Size = sequelize.define(
  "Size",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the Role model
const Role = sequelize.define(
  "Role",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the User model
const Users = sequelize.define(
  "Users",
  {
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Define the one-to-one relationship between User and Role
Role.hasMany(Users, { foreignKey: "roleId" });
Users.belongsTo(Role, { foreignKey: "roleId" });

// Define the one-to-one relationship between Animal and Species
Species.hasMany(Animal, {
  foreignKey: "speciesId",
  allowNull: false,
  onDelete: "RESTRICT",
});
Animal.belongsTo(Species, {
  foreignKey: "speciesId",
  allowNull: false,
  onDelete: "RESTRICT",
});

// Define the one-to-one relationship between Animal and Size
Size.hasMany(Animal, { foreignKey: "sizeId" });
Animal.belongsTo(Size, { foreignKey: "sizeId" });

// Define the many-to-many relationship between Animal and Temperament
Animal.belongsToMany(Temperaments, {
  through: "AnimalTemperament",
  onDelete: "RESTRICT",
});
Temperaments.belongsToMany(Animal, {
  through: "AnimalTemperament",
  onDelete: "RESTRICT",
});

// Define the many-to-many relationship between Animal and Temperament
Animal.belongsToMany(Users, { through: "Adoption", onDelete: "RESTRICT" });
Users.belongsToMany(Animal, { through: "Adoption", onDelete: "RESTRICT" });

const sync_db = async () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      init_db();
      console.log("Database synced!");
    })
    .catch((error) => {
      console.error("Error syncing database:", error);
    });
};

const init_db = async () => {
  await sequelize.query(
    "INSERT INTO `sizes`(`name`) VALUES ('small'), ('medium'), ('large')"
  );
  await sequelize.query(
    "INSERT INTO `roles`(`name`) VALUES ('admin'), ('member')"
  );
  await sequelize.query(
    "INSERT INTO `temperaments`(`name`) VALUES ('calm'), ('scared'), ('energetic'), ('happy'), ('lazy')"
  );
  await sequelize.query(
    "INSERT INTO `species`(`name`) VALUES ('Dwarf Hamster'), ('Tedy bear hamster'), ('Juck-Russel'), ('Budgy'), ('Tortouse'), ('Gold Fish'), ('Lizzard'), ('Bearder Dragon'), ('Parrot'), ('Corn Snake')"
  );
  await sequelize.query(
    "INSERT INTO `users`(`fullName`, `username`, `password`, `roleId`) VALUES ('System Admin', 'Admin', 'admin1234', 1), ('User', 'User', 'user1234', 2), ('User2', 'User', 'user1234', 2)"
  );
  await sequelize.query(
    "INSERT INTO `animals`(`name`, `birthday`, `speciesId`, `sizeId`)\
                        VALUES\
                        ('Coco', '2020-02-12', 1, 1),\
                        ('Ted', '2021-02-12', 2, 1),\
                        ('Coco', '2020-02-12', 3, 2),\
                        ('Everrest', '2019-02-12', 4, 1),\
                        ('Rocko', '2020-02-12', 5, 2),\
                        ('Goldy', '2023-02-12', 6, 1),\
                        ('Lizzy', '2020-02-12', 7, 2),\
                        ('Goga', '2018-02-12', 8, 3),\
                        ('Tweet Tweet', '2020-02-12', 9, 3),\
                        ('Toothless', '2017-02-12', 10, 2),\
                        ('Sophie', '2020-02-12', 1, 1),\
                        ('Teddy', '2021-02-12', 2, 1),\
                        ('Roger', '2020-02-12', 9, 3)"
  );
  await sequelize.query(
    "INSERT INTO `animaltemperament`(`AnimalId`, `TemperamentId`) VALUES\
                        ( 1,  1),\
                        ( 1,  2),\
                        ( 2,  1),\
                        ( 2,  2),\
                        ( 3,  3),\
                        ( 4,  1),\
                        ( 4,  4),\
                        ( 5,  1),\
                        ( 5,  5),\
                        ( 6,  1),\
                        ( 7,  1),\
                        ( 7,  5),\
                        ( 8,  1),\
                        ( 8,  3),\
                        ( 8,  2),\
                        ( 9,  1),\
                        ( 9,  4),\
                        ( 10,  2),\
                        ( 11,  1),\
                        ( 11,  2),\
                        ( 12,  1),\
                        ( 12,  2),\
                        ( 13,  1),\
                        ( 13,  4)"
  );

  console.log("Database Init!");
};

const getAnimals = async () => {
  function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const animals = await Animal.findAll({
    include: [
      { model: Species },
      { model: Size },
      { model: Users, through: "Adoption" },
      { model: Temperaments },
    ],
  });

  return animals.map((animal) => ({
    Id: animal.id,
    Name: animal.name,
    Species: animal?.Species?.name,
    Birthday: animal.birthday,
    Age: calculateAge(animal.birthday),
    Temperament: animal?.Temperaments.map((temp) => temp?.name).join(","),
    Size: animal?.Size?.name,
    Adopted: Boolean(animal?.Users[0]?.id),
  }));
};

const updateAnimals = async (AnimalId, userId, value) => {
  const animal = await Animal.findByPk(AnimalId);
  const user = await Users.findByPk(userId);
  console.log(`animal ${animal} user ${userId}`);

  if (value) {
    const ress = await animal.addUser(user);
    console.log(` ${AnimalId} updated to ${ress}`);
    return true;
  } else {
    if (userId == 1) {
      await sequelize.models.Adoption.destroy({
        where: { AnimalId: AnimalId },
      });
      // await animal.removeUsers();
    } else {
      await animal.removeUser(user);
    }
    return false;
  }
};

const getSpecies = async () => {
  const species = await Species.findAll();
  return species.map((specie) => ({ Id: specie.id, Name: specie.name }));
};

const getTemperaments = async () => {
  const temperaments = await Temperaments.findAll();
  return temperaments.map((temperament) => ({
    Id: temperament.id,
    Name: temperament.name,
  }));
};

const updateTemperaments = async (TemperamentId, name) => {
  const temperament = await Temperaments.findByPk(TemperamentId);
  if (temperament) {
    temperament.name = name;
    await temperament.save();
    console.log(`updated to ${name}`);
    return true;
  } else {
    console.log(`${TemperamentId} not found`);
    return false;
  }
};

const deleteTemperaments = async (TemperamentId) => {
  try {
    await Temperaments.destroy({
      where: {
        id: TemperamentId,
      },
    });
    return true;
  } catch {
    return false;
  }
};

const addTemperaments = async (name) => {
  const temperament = await Temperaments.create({ name: name });
  if (temperament) {
    return true;
  } else {
    return false;
  }
};

const updateSpecie = async (SpecieId, name) => {
  const Specie = await Species.findByPk(SpecieId);
  try {
    if (Specie) {
      Specie.name = name;
      await Specie.save();
      console.log(`updated to ${name}`);
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

const deleteSpecie = async (SpecieId) => {
  try {
    await Species.destroy({
      where: {
        id: SpecieId,
      },
    });
    return true;
  } catch {
    return false;
  }
};

const addSpecie = async (name) => {
  try {
    await Species.create({ name: name });
    return true;
  } catch {
    return false;
  }
};

const addUser = async (username, fullname, pass) => {
  try {
    await Users.create({
      username: username,
      fullName: fullname,
      password: pass,
      roleId: 2,
    });
    return true;
  } catch {
    return false;
  }
};

const authenticate = async (username, password) => {
  const user = await Users.findOne({
    where: { username: username, password: password },
    include: [Role],
  });
  if (user) {
    console.log(`${user.Role.name} found`);
    return { username: user.username, userId: user.id, role: user.Role.name };
  } else {
    console.log(`${username} not found`);
    return false;
  }
};

module.exports.sync_db = sync_db;
module.exports.init_db = init_db;
module.exports.getSpecies = getSpecies;
module.exports.getTemperaments = getTemperaments;
module.exports.updateSpecie = updateSpecie;
module.exports.deleteSpecie = deleteSpecie;
module.exports.addSpecie = addSpecie;
module.exports.updateTemperaments = updateTemperaments;
module.exports.deleteTemperaments = deleteTemperaments;
module.exports.addTemperaments = addTemperaments;
module.exports.authenticate = authenticate;
module.exports.getAnimals = getAnimals;
module.exports.updateAnimals = updateAnimals;
module.exports.addUser = addUser;
