import React, { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Autocomplete, Box, Button, ClickAwayListener, InputAdornment, TextField, Typography } from '@mui/material';
import { MainColes } from 'layouts';
import Container from 'components/container';
import { getProducts } from 'api/products/get-products';
import { ProductItem } from 'types/products/product';
import Image from 'next/image';
import RoundedButton from 'components/buttons/rounded-button';
import CloseIconButton from 'components/buttons/close-icon-button';
import { ProductSearchItem } from 'components/page-sections/search/product-search-item';
import { useMounted } from 'hook/useMounted';

const NoBarcodeFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20vh',
            }}
        >
            <Image src="/assets/images/barcode_icon.svg" height={65} width={65} alt="Barcode" />
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>No barcode found</Typography>
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
                We weren’t able to identify that Coles brand product from the barcode. Please enter the name of the product you
                would like to recycle to see if the information is available.
            </Typography>
        </Box>
    );
};
export const ProductSearch = (props: { onSelectProduct(product): void }) => {
    const router = useRouter();
    const [results, setResults] = useState<ProductItem[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<ProductItem[]>([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBarCodeNotFound, setIsBarCodeNotFound] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const mounted = useMounted();
    const loading = options.length === 0;

    const fetchInitialProducts = useCallback(async () => {
        const data = await getProducts();
        const products = data.map((product) => ({ id: product.id, ...product.data() })).filter((product) => product.uid);
        setOptions(products);
    }, []);

    useEffect(() => {
        if (router.query.hasOwnProperty('not-found')) {
            setIsBarCodeNotFound(true);
        }
    }, [router.query]);

    useEffect(() => {
        fetchInitialProducts();
    }, []);

    const ProductSearchList = useMemo(() => {
        return (
            <Box sx={{ marginTop: 1 }}>
                {results.map((item, index) => (
                    <ProductSearchItem key={`${item?.uid}-${index}`} item={item} onSelectProduct={() => { 
                        props.onSelectProduct(item); 
                        setInputValue(item?.name);
                        setResults([]);  
                    }} />
                ))}
            </Box>
        );
    }, [results]);

    const handleSearch = () => {
        const searchedItems =
            options.length > 0
                ? options.filter((item) => item && (item.name.toLowerCase().includes(inputValue.toLowerCase()) || item.uid.toLowerCase().includes(inputValue.toLowerCase())))
                : [];
        if (searchedItems?.length === 0) {
            setIsNotFound(true);
        }
        setResults(searchedItems.slice(0, 25) as ProductItem[]);
    };

    const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = (event: KeyboardEvent<HTMLDivElement>, newValue: ProductItem) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            return;
        }
        if (newValue?.id) {
            props.onSelectProduct(newValue);
        }
    };

    function onClickCancel() {
        setInputValue('');
        setIsOpenDropdown(false);
    }

    function onInputChange(event: KeyboardEvent<HTMLInputElement>, value: string) {
        // Hide barcode not found component if user started typing
        setIsBarCodeNotFound(false);
        const searchedItems = options.filter((item) => (item.name.toLowerCase().includes(value.toLowerCase()) || item.uid.toLowerCase().includes(value.toLowerCase())));
        setIsNotFound(searchedItems?.length === 0);
        setInputValue(value);
        setResults(searchedItems.slice(0, 25));
        setIsDirty(true);
        setIsOpenDropdown(true);
    }

    function onDropdownClickAway() {
        setIsOpenDropdown(false);
    }

    function onSearchInputFocus() {
        if (inputValue) {
            setIsOpenDropdown(true);
        }
    }

    useEffect(() => {
        if (inputValue.length === 0 && isDirty) {
            setResults([]);
            setIsNotFound(false);
        }
    }, [inputValue, isDirty]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: -2
            }}
        >
            <Autocomplete
                sx={{ width: '100%' }}
                open={false}
                freeSolo
                inputValue={inputValue}
                onInputChange={onInputChange}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
                onFocus={onSearchInputFocus}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                getOptionLabel={(option) => (typeof option === 'object' ? option.name : option)}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 2 }}>
                        <TextField
                            {...params}
                            placeholder="Search"
                            hiddenLabel
                            id="filled-hidden-label-small"
                            variant="filled"
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Image src="/assets/images/search.svg" height={12} width={12} alt="Search icon" />
                                    </InputAdornment>
                                ),
                                endAdornment: null,
                                style: {
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    fontSize: 16,
                                },
                            }}
                        />
                        <Button
                            onClick={onClickCancel}
                            sx={{
                                marginLeft: 1,
                                display: inputValue ? 'block' : 'none',
                                transition: 'all 0.2s ease-in-out',
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                )}
            />
            {isNotFound ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '2vh',
                    }}
                >
                    <Image src="/assets/images/search_icon.svg" height={65} width={65} alt="Magnifying glass icon" />
                    <Typography sx={{ fontWeight: 'bold', fontSize: 20, marginTop: 1 }}>Item wasn’t found</Typography>
                </Box>
            ) : (
                <Box sx={{ marginTop: 3 }}>
                    {results.length > 0 && <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Search Results</Typography>}
                    {ProductSearchList}
                </Box>
            )}
        </Box>
    );
};
