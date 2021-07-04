import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useGetMovie } from '../../hooks/useGetMovie'
import { LoadingIndicator } from '../../components/LoadingIndicator';
import Movie from '../../components/Movie'

const ReviewMovie = () => {
    const router = useRouter()
    const { id } = router.query
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (!id) return;

        useGetMovie(id).then((res) => {
            setMovie(res.data)
        }).catch(console.error)
    }, [id]);

    if (!movie) return <LoadingIndicator fullScreen />

    return <Layout>
        <Movie {...movie} />
    </Layout>

}

export default ReviewMovie