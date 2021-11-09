const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', function () {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title', function () {
      it('should throw an error if title is null', function (done) {
        Recipe.create({
        summary: "this would be a summary",
        score: 100,
        healthScore: 100,
        analyzedInstructions: "these would be the instructions"
      })
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should work when its a valid title', () => {
        Recipe.create({
          title: 'Milanesa a la napolitana',
          summary: "this would be a summary",
          score: 100,
          healthScore: 100,
          analyzedInstructions: "these would be the instructions"
          });
      });
    });
    describe('score', function(){
      it('should throw an error if score is null', function(done) {
        Recipe.create({
          title: 'Milanesa a la napolitana',
          summary: "this would be a summary",
          healthScore: 100,
          analyzedInstructions: "these would be the instructions"
      })
          .then(() => done(new Error('It requires a valid score')))
          .catch(() => done());
      });
      it('should throw an error if score is not a number', function(done) {
        Recipe.create({
          title: 'Milanesa a la napolitana',
          summary: "this would be a summary",
          score: "invalid score",
          healthScore: 100,
          analyzedInstructions: "these would be the instructions"
      })
          .then(() => done(new Error('It requires score to be a number')))
          .catch(() => done());
      });
    
    })
    describe('summary', function(){
      it('should throw an error if summary is null', function(done) {
        Recipe.create({
          title: 'Milanesa a la napolitana',
          score: 100,
          healthScore: 100,
          analyzedInstructions: "these would be the instructions"
      })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', function() {
        Recipe.create({ 
          title: 'Milanesa a la napolitana',
          summary: "this would be a summary",
          score: 100,
          healthScore: 100,
          analyzedInstructions: "these would be the instructions"
        });
      });
    });
  });
});
