import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { AppDispatch, RootState } from "../../../../redux/ReduxStore";


import './ReigsterLibraryCardForm.css'
import { getLibraryCard } from "../../../../redux/slices/AuthenticationSlice";
import { setDisplayLibaryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";

export const ReigsterLibraryCardForm:React.FC = () => {
	const userState = useSelector((state:RootState) => state.authentication);

	const dispatch:AppDispatch = useDispatch();

	const handleCreateLibaryCard = () => {
		if(userState.loggedInUser) {
			dispatch(
				getLibraryCard(userState.loggedInUser?._id)
			);
		}
	}

	const handleLoginClick = () => {
		dispatch(setDisplayLibaryCard(false));
		dispatch(setDisplayLogin(true));
	}

	return(
		<>
			{
				userState.loggedInUser ?
					<div className="register-library-card-container">
						<h3 className="register-library-card-text"> Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName} !</h3>
						<h5 className="register-library-card-text"> To signup for a new library card, or you forgot the ID number on your card, use the button below.</h5>
						{
							userState.libraryCard ? <p className="register-library-card-text"> Your card number: {userState.libraryCard}</p> :
								<button className="register-library-modal-button" onClick={handleCreateLibaryCard}>Get Library Card</button>
						}
					</div>:	 
						<div className="register-library-card-container">
							<h3 className="register-library-card-text"> You must be a member of the library to obtain a library card.</h3>
							<h5 className="register-library-card-text"> Use the button below to login to your account or register for free.</h5>
							<button  className="register-library-modal-button" onClick={handleLoginClick} >Login here</button>
					</div>

			}
		</>
	)

}