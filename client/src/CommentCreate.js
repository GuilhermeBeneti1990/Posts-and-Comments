/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://posts.com:4001/posts/${postId}/comments`, {
            content
        });

        setContent('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input 
                        className='form-control'
                        value={content}
                        onChange={e => setContent(e.target.value)}    
                    />
                </div>
                <button className='bt btn-primary'>Submit</button>
            </form>
        </div>
    )
}