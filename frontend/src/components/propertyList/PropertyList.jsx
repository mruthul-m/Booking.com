import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5444/api/hotels/countByType"
  );

  const images = [
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&o=",

    "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&o=",

    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=",

    "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450093.jpeg?k=aa5cc7703f3866af8ffd6de346c21161804a26c3d0a508d3999c11c337506ae1&o=",

    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450068.jpeg?k=41cc7c5449011323aaaaed4e845cb16200b5d540c77a50c1bea90399a1e92d70&o=",
  ];

  return (
    <div className="pList">
      {loading ? (
        " loading"
      ) : (
        <>
          {data.length > 0 &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitle">
                  <h3>{data[i]?.type}</h3>
                  <p>
                    {data[i]?.count} {data[i]?.type}{" "}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
