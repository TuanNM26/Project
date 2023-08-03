import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, message, Modal, Divider } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import userApi from '../../../api/user/user';
import { toast } from 'react-toastify';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AvatarUploader = () => {
  const { mutate } = useMutation({
    mutationFn: (payload) => userApi.changeAvatar(payload),
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [userId, setUserId] = useState('');
  const [fileList, setFileList] = useState([]);

  const { data, isError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => userApi.userDetail(),
    staleTime: 180000,
    cacheTime: 180000,
  });

  useEffect(() => {
    if (data?.user?.id) {
      setUserId(data.user.id);
    }

    if (data?.user?.avatar) {
      setFileList([
        {
          uid: '1',
          name: 'default-avatar.png',
          status: 'done',
          url: data.user.avatar,
        },
      ]);
    }
  }, [data]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    if (!file.url) {
      const src = await getBase64(file.originFileObj);

      const newFile = {
        uid: '-1',
        name: file.name,
        status: 'done',
        url: src,
      };

      setFileList([newFile]);
      message.success('Upload successfully.');
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onUpload = async ({ file }) => {
    const src = await getBase64(file);
    mutate({ file, userId });

    const newFile = {
      uid: '-1',
      name: file.name,
      status: 'done',
      url: src,
    };

    setFileList([newFile]);
    toast.success('Change avatar success');
  };

  const showUploadButton = fileList.length === 0;

  return (
    <div style={{ textAlign: 'center' }}>
      <Divider>Ảnh đại diện</Divider>
      <ImgCrop rotation>
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={onUpload}
          showUploadList={{ showRemoveIcon: false }}
          shape="circle"
        >
          {showUploadButton && '+ Upload'}
        </Upload>
      </ImgCrop>
      <Modal visible={previewOpen} footer={null} onCancel={handleCancel}>
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
        <button>Upload</button>
      </Modal>
    </div>
  );
};

export default AvatarUploader;
