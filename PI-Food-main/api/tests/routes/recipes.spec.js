/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
  summary: "this would be a summary",
  score: 100,
  healthScore: 100,
  analyzedInstructions: "these would be the instructions"
};

describe('Recipes routes', function() {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', function () {
    it('should get 200', function () {
    agent.get('/recipes').expect(200)
    });
  });
  describe('GET /recipes?name', function () {
    it('should get 200 if recipe name exists', function () {
      agent.get('/recipes?name=milanesa').expect(200)
    });
    it('should get error message if there´s no matching recipe', function () {
      agent.get('/recipes?name=pepito').expect("Sorry, we couldn´t find the recipe you were looking for :(")
    });
  });
  describe('GET /recipes/:params', function () {
    it('should get 200 if params id exists', function () {
      agent.get('/recipes/633921').expect(200)
    });
    it('should get error message if params id does not existe', function () {
      agent.get('/recipes/999999').expect("Sorry, we couldn´t find the recipe you were looking for :(")
    });
  });
});
