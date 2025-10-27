import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet, View } from "react-native";
import { ErrorState } from "../../src/components/common/ErrorState";
import { Loader } from "../../src/components/common/Loader";
import { AddToCartFooter } from "../../src/components/product/AddToCartFooter";
import { ProductDescription } from "../../src/components/product/ProductDescription";
import { ProductDetailHeader } from "../../src/components/product/ProductDetailHeader";
import { ProductImageGallery } from "../../src/components/product/ProductImageGallery";
import { ProductInfoSection } from "../../src/components/product/ProductInfoSection";
import { ProductPriceSection } from "../../src/components/product/ProductPriceSection";
import { ProductReviews } from "../../src/components/product/ProductReviews";
import { ProductSpecifications } from "../../src/components/product/ProductSpecifications";
import { useCart } from "../../src/hooks/useCart";
import { useFavorites } from "../../src/hooks/useFavorites";
import { useGetProductByIdQuery } from "../../src/services/productsApi";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { toggle, isFavorite } = useFavorites();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [headerVisible, setHeaderVisible] = useState(true);

  const productId = Number(id);
  const enabled = Number.isFinite(productId) && productId > 0;

  const { data, isLoading, isError, refetch } = useGetProductByIdQuery(
    productId,
    {
      skip: !enabled,
    }
  );

  if (!enabled) {
    return (
      <ErrorState
        title="Invalid Product"
        message="Product ID is missing or invalid."
        onRetry={() => router.back()}
      />
    );
  }

  if (isLoading) {
    return <Loader message="Loading product..." />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Failed to Load"
        message="Unable to load product details."
        onRetry={refetch}
      />
    );
  }

  const handleAddToCart = () => {
    addToCart(data);
  };

  const handleShare = () => {
    console.log("Share product:", data.id);
  };

  const handleToggleFavorite = () => {
    toggle(data.id);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setHeaderVisible(offsetY < 50);
      },
    }
  );

  const favorite = isFavorite(data.id);
  const inCart = isInCart(data.id);

  const specifications = [
    { label: "Category", value: data.category },
    { label: "Brand", value: data.brand || "N/A" },
    { label: "SKU", value: data.sku || "N/A" },
    { label: "Weight", value: `${data.weight}g` },
    {
      label: "Availability",
      value: data.stock > 0 ? "Available" : "Out of Stock",
      highlight: data.stock > 0,
    },
    { label: "Warranty", value: data.warrantyInformation || "N/A" },
    { label: "Shipping", value: data.shippingInformation || "N/A" },
    { label: "Return Policy", value: data.returnPolicy || "N/A" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Floating Header */}
      <ProductDetailHeader
        title={data.title}
        onBackPress={() => router.back()}
        onSharePress={handleShare}
        onFavoritePress={handleToggleFavorite}
        isFavorite={favorite}
        transparent={headerVisible}
      />

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Hero Image */}
        <ProductImageGallery
          images={data.images}
          thumbnail={data.thumbnail}
          discountPercentage={data.discountPercentage}
        />

        {/* Content Card */}
        <View style={styles.contentCard}>
          <ProductInfoSection
            brand={data.brand}
            title={data.title}
            rating={data.rating}
            reviewCount={data.reviews?.length || 0}
            stock={data.stock}
          />

          <ProductPriceSection
            currentPrice={data.price}
            discountPercentage={data.discountPercentage}
          />

          <View style={styles.section}>
            <ProductDescription description={data.description} />
          </View>

          <View style={styles.section}>
            <ProductSpecifications specifications={specifications} />
          </View>

          {data.reviews && data.reviews.length > 0 && (
            <View style={styles.section}>
              <ProductReviews
                reviews={data.reviews}
                averageRating={data.rating}
              />
            </View>
          )}

          <View style={{ height: 120 }} />
        </View>
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <AddToCartFooter
        price={data.price}
        onAddToCart={handleAddToCart}
        disabled={data.stock === 0}
        inCart={inCart}
        onGoToCart={() => router.push("/cart")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  section: {
    marginTop: 24,
  },
});
