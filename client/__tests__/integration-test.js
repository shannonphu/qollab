import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CommentForm  from '../src/components/comments/CommentForm.jsx';
import React from 'react';
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Axios', () => {
    it('returns data when sendMessage is called', done => {
        //var mock = new MockAdapter(axios);
        //const data = { response: true };
        //mock.onGet('http://localhost:3005/comment/upvote').reply(200, data);
        var joinCode = "12345"
        // const wrapper = mount(<CommentForm joinCode={joinCode}/>);
        // wrapper.instance().submitHandler().then(() => {
        //
        //     axios.get('http://localhost:3005/comments/' + joinCode)
        //         .then((response) => {
        //             expect(response).toEqual(1)
        //         })
        //     done();
        // });
        axios.post('http://localhost:3005/comment/create', {
            joinCode: joinCode,
            text: "Hello",
            annotation: null
        }).then((response) => {
            axios.get('http://localhost:3005/comments/' + joinCode)
                .then((response) => {
                    expect(response).toEqual(1)
                })
            done();
        })
        // check that a post request was made
    });
});
