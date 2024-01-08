export const Loading = () => {
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center w-100 h-100">Loading...</div>
        <br />
        <div className="d-flex justify-content-center">           
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    </div>
  )
}
