import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import { ProductItem } from 'types/products/product';

interface ProductSearchItemProps {
  item: ProductItem;
  onSelectProduct(item: ProductItem): void
}

export const ProductSearchItem: FC<ProductSearchItemProps> = (props) => {
  const { item } = props;

  function onClickItem() {
    props.onSelectProduct(item)
  }

  function onImageError(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = 'https://firebasestorage.googleapis.com/v0/b/coles-recycle-app.appspot.com/o/assets%2Fimg_error.svg?alt=media';
    return e;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        '& > *': {
          flexBasis: 0,
        },
      }}
      onClick={onClickItem}
    >
      <Box
        component="img"
        src={item.gcpImageFront ?? '/assets/images/search.svg'}
        alt={item.name}
        sx={{ width: 60, height: 90, objectFit: 'contain' }}
        onError={onImageError}
      ></Box>
      <Box
        sx={{
          flexGrow: 8,
        }}
        paddingX={2}
      >
        <Typography sx={{ fontSize: 12 }}>{item?.name}</Typography>
        <Typography sx={{ fontSize: 12 }}>{item?.uid}</Typography>
      </Box>
      <Box sx={{ flexGrow: 2 }}>
        <Button sx={{ fontWeight: 600, color: '#000' }} onClick={onClickItem}>
          Select
        </Button>
      </Box>
    </Box>
  );
};
