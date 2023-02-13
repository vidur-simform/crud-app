const handleFileInputChange = (e) => {
    console.log(e.target.files)
    for (let i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].type == "image/png" || e.target.files[i].type == "image/jpeg") {
            encodeAndAppend(e.target.files[i]);
        }
        else {
            setErrMsg("Input file type must be image only.");
        }
    }
};

const encodeAndAppend = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setSelectedImages((prev) => [...prev, reader.result]);
    };
    reader.onerror = () => {
        console.error('something went wrong!');
        setErrMsg('something went wrong!');
    };
    setErrMsg('');
};