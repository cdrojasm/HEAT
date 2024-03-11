import About from '../../components/About/'
import Main from '../../components/Main'
import { useRouter } from 'next/router'

export default function UsersPage() {
	const router = useRouter();
	const { pathname } = router
	return (
		<Main forwardURL={pathname}>
			<About />
		</Main>
	)
}