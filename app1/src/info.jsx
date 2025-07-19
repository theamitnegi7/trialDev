import PendingFriends from './PendingFriends';
import FriendRequest from './FriendRequest';
import PostUpload from './PostUpload';
import Friends from './Friends';
import Posts from './Posts';
import Profile from './profile';
import './style.css';

function Info(){
    return(
        <>
            {/* <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="panel">
                    <PendingFriends /> </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel">
                    <FriendRequest /> 
                     <PostUpload /></div>
                     <div className="panel">
                     <Posts /></div>
                    </div>
                    <div className="col-md-3">
                        <div className="panel">
                    <Friends /> </div>
                    </div>
                </div>
            </div> */}
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <div className="panel">
                            <Profile/>
                        </div>
                        <div className="panel">
                            <PendingFriends /> 
                        </div>
                    </div>

                    <div className="col-md-6 scrollable-middle">
                        <div className="panel">
                            <FriendRequest /> 
                            <PostUpload />
                        </div>
                        <div className="panel">
                            <Posts />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="panel">
                            <Friends /> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Info;