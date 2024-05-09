import { DownloadIcon } from '@chakra-ui/icons';
import { IconButton, useColorModeValue } from '@chakra-ui/react';

const DownloadButton = (props: { content: string; fileName: string }) => {
  const iconColor = useColorModeValue('brand.500', 'white');
  const { content, fileName } = props;

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <IconButton
      aria-label="download-file"
      icon={<DownloadIcon />}
      color={iconColor}
      onClick={handleDownload}
    />
  );
};

export default DownloadButton;
