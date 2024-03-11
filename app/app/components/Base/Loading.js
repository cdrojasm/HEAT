export default function Loading({ message }) {
	return (<>
		<div className="spinner">
			<style jsx>{`
				.spinner{
					border: 4px solid rgba(0,0,0,0.1);
					width: 36px;
					height: 36px;
					border-radius: 50%;
					border-left-color:#09f;
					animation: spin 1s ease infinite;
					display:inline-block;
				}
				@keyframes spin{
					0%{transform: rotate(0deg)}
					100%{transform: rotate(360deg)}
				}	
				.spinnermsn {
					content: "«";
					display:inline-block;
				  }
			`}</style>
		</div>
		<div className="spinnermsn">{message}</div>
	</>)
}
