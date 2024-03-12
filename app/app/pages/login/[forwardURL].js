import { useRouter } from 'next/router'
import LoginPage from '../../components/Base/LoginPage'

export default function Login() {
	const router = useRouter();
	const { forwardURL, forward } = router.query;
	if (forward !== undefined) {
		return <LoginPage forward={forward} />
	} else {
		return <>Cargando...</>
	}
}
