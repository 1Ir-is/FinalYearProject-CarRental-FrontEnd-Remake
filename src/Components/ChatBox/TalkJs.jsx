import React, { useEffect } from 'react';
import Talk from 'talkjs';
import { useAuth } from '../../Context/useAuth';


function TalkJs() {
    const { user } = useAuth();
    console.log(user);
    useEffect(() => {
        if (user) {
            Talk.ready.then(() => {
                const me = new Talk.User({
                    id: user.userId.toString(), // Replace with your user ID
                    name: user.name, // Replace with your name
                    email: user.email, // Replace with your email
                    photoUrl: user.avatar, // Replace with your photo URL
                    welcomeMessage: 'Hey there! How can I help you?', // Optional welcome message
                    role: 'user'
                });
    
                const admin = new Talk.User({
                    id: '20', // Replace with your admin user ID
                    name: 'Admin', // Replace with admin name
                    email: 'admin@gmail.com', // Replace with admin email
                    photoUrl: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg', // Replace with admin photo URL
                    role: 'admin'
                    // Optional welcome message for admin
                });
    
                var session = new Talk.Session({
                    appId: 'tcKEJWWb',
                    me: me,
                });
    
                var conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, admin));
                conversation.setParticipant(me);
                conversation.setParticipant(admin);
    
                var inbox = session.createInbox({ selected: conversation });
                inbox.mount(document.getElementById('talkjs-container'));
            });
        }
    }, [user]);
    

    return <div id="talkjs-container" style={{ height: '500px' }}></div>;
}

export default TalkJs;