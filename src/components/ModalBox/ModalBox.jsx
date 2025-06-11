import React from 'react';

export const ModalBox = ({
	isOpen = false,
	title = '',
	children,
	onClose,
	footer,
	centered = true,
	size = '',
}) => {
	if (!isOpen) return null;

	return (
		<div
			className="modal fade show"
			style={{ display: 'block' }}
			tabIndex="-1"
			aria-modal="true"
			role="dialog"
		>
			<div
				className={`modal-dialog${
					centered ? ' modal-dialog-centered' : ''
				} ${size}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-content">
					<div className="modal-header">
						{title && <h5 className="modal-title">{title}</h5>}
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">{children}</div>
					{footer && <div className="modal-footer">{footer}</div>}
				</div>
			</div>
		</div>
	);
};
