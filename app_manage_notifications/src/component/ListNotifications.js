import react, { useState, useEffect } from 'react'
import './style.css'
import axios from "axios";
function ListNotifications() {

    const [listNotifications, setListNotifications] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        let newlist = []
        try {

            await axios.get(`https://app-fcm.herokuapp.com/notifications`).then(res => {
                const persons = res.data;
                for (let i = 0; i < persons.length; i++) {
                    const newNotification = {
                        index: i,
                        token: persons[i].token,
                        title: persons[i].title,
                        content: persons[i].content
                    }

                    newlist.push(newNotification);
                }
            })
        } catch (err) {
            console.log(err)
            console.log("Error loading")
        }
        setListNotifications(newlist)
    }

    console.log(listNotifications);

    return (
        <div className="list">
            <h1>List Notifications</h1>
            <table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>token</th>
                        <th>Title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>
                    {listNotifications && listNotifications.map((notification) => {
                        return (
                            <tr key={notification.index}>
                                <td>
                                    <p>
                                        {notification.index}
                                    </p>
                                </td>
                                <td>
                                    <p  className="token">
                                        {notification.token}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        {notification.title}
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        {notification.content}
                                    </p>
                                </td>
                            </tr>
                        )
                    }
                    )}

                </tbody>
            </table>
        </div>
    );
}

export default ListNotifications;
