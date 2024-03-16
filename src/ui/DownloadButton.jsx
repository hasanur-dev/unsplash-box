const DownloadButton = ({ imageUrl, imageName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageName;
    link.target = "_blank"; // This line is optional and can be removed if not needed
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={handleDownload}>Download Image</button>;
};

export default DownloadButton;
