import React, { useState, useEffect } from "react";
import "../styles/components/warningMessage.css";
import { Modal, ModalBody } from "reactstrap";
import warningIcon from "../images/warning-icon.svg";
import api from "../services/api";

interface WarningMessageProps {
	id: number;
	modalProp: boolean;
}

export default function WarningMessage({ id, modalProp }: WarningMessageProps) {
	const [modal, setModal] = useState(modalProp);
	const toggle = () => setModal(!modal);

	useEffect(() => {
		setModal(modalProp);
	}, [modalProp]);

	async function handleClickAfirmativeBtn() {
		await api
			.delete(`/orphanages/${id}`)
			.then((response) => {
				alert(response.data.message);
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleClickNegativeBtn() {
		toggle();
	}

	return (
		<Modal isOpen={modal} toggle={toggle} className={"modal-container"}>
			<ModalBody>
				<div className={"modal-text-container"}>
					<h1>Excluir!</h1>
					<span>
						Você tem certeza que quer excluir Orf. Esperança?
					</span>
					<div className="action-container">
						<button
							onClick={handleClickAfirmativeBtn}
							type="button"
							className={"afirmative-btn"}
						>
							Sim, apagar!
						</button>
						<button
							onClick={handleClickNegativeBtn}
							type="button"
							className={"negative-btn"}
						>
							Não, voltar!
						</button>
					</div>
				</div>
				<div className={"image-container"}>
					<img src={warningIcon} alt={"Warning Icon"} />
				</div>
			</ModalBody>
		</Modal>
	);
}
