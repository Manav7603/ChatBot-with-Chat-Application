import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
	// getDoc,
	// uploadBytes,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes, getMetadata,  getDownloadURL as getFileDownloadURL,getStorage  } from "firebase/storage";





const Input = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (img) {
			const storageRef = ref(storage, uuid());
			console.log(storageRef);
			const uploadTask = uploadBytesResumable(
				storageRef,
				img
			);

			uploadTask.on(
				(error) => {
					console.log("Error is ", error);
				},
				() => {
					getDownloadURL(
						uploadTask.snapshot.ref
					).then(async (downloadURL) => {
						console.log(downloadURL);
						await updateDoc(
							doc(
								db,
								"chats",
								data.chatId
							),
							{
								messages: arrayUnion(
									{
										id: uuid(),
										text,
										senderId: currentUser.uid,
										date: Timestamp.now(),
										img: downloadURL,
									}
								),
							}
						);
					});
				}
			);
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}

		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId + ".lastMessage"]: {
				text,
			},
			[data.chatId + ".date"]: serverTimestamp(),
		});

		setText("");
		setImg(null);

		if (data.user.displayName === "ChatBOT") {
            await updateDoc(
                doc(db, "chats", data.chatId),
                {
                    messages: arrayUnion(
                        {
                            id: uuid(),
                            text: text,
                            senderId: "ChatBOT", 
                            date: Timestamp.now(),
                        }
                    ),
               }
            ); 
			await updateDoc(doc(db, "userChats", data.user.uid), {
				[data.chatId + ".lastMessage"]: {
					text,
				},
				[data.chatId + ".date"]: serverTimestamp(),
			});
			
			await updateDoc(doc(db, "userChats", currentUser.uid), {
				[data.chatId + ".lastMessage"]: {
					text,
				},
				[data.chatId + ".date"]: serverTimestamp(),
			});



			try {
				const response = await axios.post('http://127.0.0.1:6969', {
					query:text
				});

				await updateDoc(
					doc(db, "chats", data.chatId),
					{
						messages: arrayUnion(
							{
								id: uuid(),
								text: response.data,
								senderId: "ChatBOT", 
								date: Timestamp.now(),
							}
						),
				   }
				);

				console.log("Response data:", response.data);
				// const columns = response.data.columns;
				// const data = response.data.data;
				console.log("Columns:", response.data['columns']);
				console.log("Data:", response.data['data']);

				// Construct the table header
				let tableText = response.data.columns.join("\t") + "\n";

				// Construct the table rows
				response.data.data. forEach(row => {
					console.log("Row:", row);
					tableText += row.join("\t") + "\n";
				});
								
				await updateDoc(
					doc(db, "chats", data.chatId),
					{
						messages: arrayUnion(
							{
								id: uuid(),
								text: tableText,
								senderId: "ChatBOT", 
								date: Timestamp.now(),
							}
						),
				   }
				);

			} catch (error) {
				console.error('Error:', error);
			}

			// const textFileContent = `Sender: ${currentUser.displayName}\nDate: ${new Date().toLocaleString()}\nMessage: ${text}`;
			// const blob = new Blob([textFileContent], { type: 'text/plain' });
			// const fileRef = ref(storage, `chatbot_messages/${uuid()}.txt`);
			// await uploadBytes(fileRef, blob);
			// const textFileContent = `Sender: ${currentUser.displayName}\nDate: ${new Date().toLocaleString()}\nMessage: ${text}\n`;
			// const fileRef = ref(storage, `chatbot_messages/${currentUser.uid}.txt`); // Use sender's ID as filename
			// const metadata = await getMetadata(fileRef).catch(() => null); // Check if file exists
			// if (metadata) {
			// 	await uploadBytes(fileRef, new Blob([textFileContent], { type: 'text/plain' }), { contentType: 'text/plain', customMetadata: { 'append': 'true' } }); // Append content to existing file
			// } else {
			// 	await uploadBytes(fileRef, new Blob([textFileContent], { type: 'text/plain' })); // Create new file
			// }
			// const fileRef = ref(storage, `chatbot_messages/${currentUser.uid}.txt`);
			// const metadata = await getMetadata(fileRef).catch(() => null);
			// let existingContent = "";
			// if (metadata) {
			// 	const existingFile = await getDownloadURL(fileRef);
			// 	const response = await fetch(existingFile);
			// 	existingContent = await response.text();
			// }
			// const newContent = `${existingContent}Sender: ${currentUser.displayName}\nDate: ${new Date().toLocaleString()}\nMessage: ${text}\n`;
			// await uploadBytes(fileRef, new Blob([newContent], { type: 'text/plain' }), { contentType: 'text/plain' });
		
			const textFileContent = `Sender: ${currentUser.displayName}\nDate: ${new Date().toLocaleString()}\nMessage: ${text}\n`;
			const fileRef = ref(storage, `chatbot_messages/${currentUser.uid}.txt`); // Use sender's ID as filename
			const metadata = await getMetadata(fileRef).catch(() => null); // Check if file exists
			if (metadata) {
				await uploadBytes(fileRef, new Blob([textFileContent], { type: 'text/plain' }), { contentType: 'text/plain', customMetadata: { 'append': 'true' } }); // Append content to existing file
			} else {
				await uploadBytes(fileRef, new Blob([textFileContent], { type: 'text/plain' })); // Create new file
			}








        }

	};
	return (
		<div className='input'>
			<input
				type='text'
				placeholder='Type something...'
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<div className='send'>
				<img src={Attach} alt='' />
				<input
					type='file'
					style={{ display: "none" }}
					id='file'
					onChange={(e) =>
						setImg(e.target.files[0])
					}
				/>
				<label htmlFor='file'>
					<img src={Img} alt='' />
				</label>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default Input;
