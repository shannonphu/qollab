
import React from 'react';
var testDBURL = 'mongodb://db_mongo';
var Lecture = require('../db/lecture.js');
var mongoose = require('mongoose')


beforeAll(() => {
    mongoose.connect(testDBURL)
});

beforeEach(() => {
    return Lecture.remove({})
})

afterAll((done) => {
    mongoose.disconnect(done);
});

describe('Creating a Lecture', () => {
    test('Test creating lecture', done => {
        return Lecture.insert('Math', '12345',  (lecture) => {
               var query = Lecture.findOne({})
               query.exec(function (err, data) {
                   if (err) throw err;
                   expect(data.title).toEqual('Math')
                   expect(data.instructor).toEqual('12345')
                   expect(data.students.length).toEqual(0)
                   expect(data.joinCode.length).toEqual(6)
                   done();
               })
           });
      });
});

describe('Creating a Lecture', () => {
      test('Test finding lecture by join code', done => {
          return Lecture.insert('Math', '12345', (l) =>  {
              Lecture.findByJoinCode(l.joinCode, (lecture) => {
                     expect(lecture.title).toEqual('Math')
                     expect(lecture.instructor).toEqual('12345')
                     expect(lecture.students.length).toEqual(0)
                     expect(lecture.joinCode.length).toEqual(6)
                     done();
                 })
             })
         });

})
