import { useContext } from "react"
import { productContext } from "../../App"

const Context = () => {
    const {product, setProduct} = useContext(productContext)
    return <>
    <button onClick={setProduct(()=> {
        setProduct(product + 1);
    })}></button>
    <h1>Use Context</h1>
    </>
}

export default Context;