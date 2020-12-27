import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { firestore } from "../firebase"

const useStoreProducts = (isRealtime: boolean) => {
  const [products, setProducts] = useState<Array<any>>([])
  const activeEstablishment = useSelector((state: any) => state.establishments.active)

  useEffect(() => {
    const establishment = firestore.collection('establishments').doc(activeEstablishment.id)
    const query = firestore.collection('products')
      .where('establishment', '==', establishment)
      .where('status', '==', 1)
    const results: Array<any> = []
    if (isRealtime) {
      query.onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setProducts(results)
      })
    } else {
      query.get().then(res => {
        res.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setProducts(results)
      })
    }
  }, [])

  return { products, setProducts }
}

export default useStoreProducts