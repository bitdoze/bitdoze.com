# View Transitions Configuration Guide

## 📝 Configuration Location

View transitions can be configured in:
```
src/config/config.json
```

## ⚙️ Configuration Options

### Complete Configuration Block

```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "fade",
      "postTitles": "fade",
      "youtubeVideos": "fade",
      "resourceCards": "slide",
      "homeHero": "fade",
      "homeSectionHeadings": "fade",
      "homeCards": "slide"
    },
    "duration": "0.3s",
    "fallback": "instant"
  }
}
```

## 🔧 Configuration Properties

### `enabled` (boolean)
- **Default:** `true`
- **Description:** Master switch to enable/disable view transitions globally
- **Values:**
  - `true` - View transitions are enabled (smooth animations)
  - `false` - View transitions are disabled (instant navigation)

**Example:**
```json
"enabled": false  // Disable all view transitions
```

---

### `animations` (object)
Configuration for specific animation types across different components.

#### `postImages` (string)
- **Default:** `"fade"`
- **Description:** Animation type for blog post images
- **Applies to:**
  - PostCard component (list views)
  - PostLayout component (single post view)
  - RelatedPosts component
  - PopularTopics component
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `postTitles` (string)
- **Default:** `"fade"`
- **Description:** Animation type for blog post titles
- **Applies to:**
  - PostCard titles
  - PostLayout titles
  - RelatedPosts titles
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `youtubeVideos` (string)
- **Default:** `"fade"`
- **Description:** Animation type for YouTube video thumbnails
- **Applies to:**
  - YouTubeVideos component
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `resourceCards` (string)
- **Default:** `"slide"`
- **Description:** Animation type for resource card images
- **Applies to:**
  - ResourceCard component
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `homeHero` (string)
- **Default:** `"fade"`
- **Description:** Animation style for the hero section container, description, CTA, and social links on the homepage
- **Applies to:**
  - Hero component container and CTA
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `homeSectionHeadings` (string)
- **Default:** `"fade"`
- **Description:** Controls how homepage section headings and supporting copy animate when navigating
- **Applies to:**
  - Home page `Latest Articles` heading/link
  - Home page `Explore Content` heading/description
  - Tools section heading/description
- **Options:** `"fade"`, `"slide"`, `"none"`

#### `homeCards` (string)
- **Default:** `"slide"`
- **Description:** Determines the animation for homepage cards such as AI tools and explore tiles
- **Applies to:**
  - Tools component cards
  - Home page Explore Content tiles
- **Options:** `"fade"`, `"slide"`, `"none"`

---

### `duration` (string)
- **Default:** `"0.3s"`
- **Description:** Default animation duration (currently informational, not enforced)
- **Format:** CSS time value (e.g., "0.3s", "300ms", "0.5s")
- **Note:** Individual components may override this

---

### `fallback` (string)
- **Default:** `"instant"`
- **Description:** Fallback behavior for browsers that don't support View Transitions API
- **Options:**
  - `"instant"` - Instant navigation without animation
  - `"none"` - Same as instant

---

## 🎨 Animation Types Explained

### `fade`
Smooth fade in/out transition. Best for general content.

**Best For:**
- Images (blog posts, thumbnails)
- Text content
- General page elements

**Visual Effect:**
- Old element fades out
- New element fades in
- Smooth opacity transition

---

### `slide`
Directional slide animation. Adds movement.

**Best For:**
- Cards
- Resource items
- Elements with spatial relationship

**Visual Effect:**
- Element slides in from direction
- Can feel more dynamic
- More noticeable than fade

---

### `none`
No animation - instant transition.

**Best For:**
- Performance optimization
- Mobile devices
- Complex elements
- Debugging

**Visual Effect:**
- Instant swap
- No animation overhead
- Fastest option

---

## 📋 Example Configurations

### Maximum Performance (Disable Animations)
```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "none",
      "postTitles": "none",
      "youtubeVideos": "none",
      "resourceCards": "none"
    }
  }
}
```

### Subtle Animations Only
```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "fade",
      "postTitles": "none",
      "youtubeVideos": "fade",
      "resourceCards": "none"
    }
  }
}
```

### Dynamic Experience
```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "slide",
      "postTitles": "slide",
      "youtubeVideos": "slide",
      "resourceCards": "slide"
    }
  }
}
```

### Disable All Transitions
```json
{
  "viewTransitions": {
    "enabled": false
  }
}
```

---

## 🔍 How It Works

### 1. Configuration Loading

The configuration is loaded in `src/config/site.ts`:

```typescript
import config from './config.json';

export const viewTransitionsConfig = {
  enabled: config.viewTransitions?.enabled ?? true,
  animations: {
    postImages: config.viewTransitions?.animations?.postImages ?? 'fade',
    postTitles: config.viewTransitions?.animations?.postTitles ?? 'fade',
    youtubeVideos: config.viewTransitions?.animations?.youtubeVideos ?? 'fade',
    resourceCards: config.viewTransitions?.animations?.resourceCards ?? 'slide',
  },
  duration: config.viewTransitions?.duration ?? '0.3s',
  fallback: config.viewTransitions?.fallback ?? 'instant',
};
```

### 2. Layout Integration

In `src/layouts/Layout.astro`, the config controls whether ViewTransitions is enabled:

```astro
import { viewTransitionsConfig } from "@config/site";

<!-- View Transitions -->
{viewTransitionsConfig.enabled && <ViewTransitions />}
```

### 3. Component Usage (Future Enhancement)

Components can import and use the animation config:

```astro
import { viewTransitionsConfig } from "@config/site";

<Image 
  transition:name="hero"
  transition:animate={viewTransitionsConfig.animations.postImages}
/>
```

---

## 🚀 Quick Start

### To Disable View Transitions Completely:

**Edit:** `src/config/config.json`

```json
{
  "viewTransitions": {
    "enabled": false
  }
}
```

### To Change Animation Style:

**Edit:** `src/config/config.json`

```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "slide",    // Changed from fade
      "postTitles": "none",     // Disabled title animations
      "youtubeVideos": "fade",
      "resourceCards": "fade"   // Changed from slide
    }
  }
}
```

### To Optimize for Mobile:

Consider disabling or using "none" for better performance:

```json
{
  "viewTransitions": {
    "enabled": true,
    "animations": {
      "postImages": "none",
      "postTitles": "none",
      "youtubeVideos": "none",
      "resourceCards": "none"
    }
  }
}
```

---

## 🧪 Testing Your Changes

After modifying the config:

1. **Rebuild the site:**
   ```bash
   npm run build
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```

3. **Test navigation:**
   - Click blog post cards
   - Click related posts
   - Navigate through series
   - Test on mobile devices

---

## 📊 Performance Considerations

### Animation Impact

| Animation | Performance | Visual Impact | Best Use |
|-----------|-------------|---------------|----------|
| `none` | ⚡ Fastest | None | Mobile, performance-critical |
| `fade` | 🟢 Good | Subtle | General use, images |
| `slide` | 🟡 Moderate | Noticeable | Cards, resources |

### Recommendations

1. **Desktop:** Use `fade` or `slide` - users expect smooth transitions
2. **Mobile:** Consider `none` or `fade` only - better performance
3. **Slow Connections:** Use `none` - instant feedback
4. **Large Images:** Use `fade` - less jarring than `slide`

---

## 🐛 Troubleshooting

### Transitions Not Working After Config Change?

1. **Clear build cache:**
   ```bash
   rm -rf dist .astro
   npm run build
   ```

2. **Check config syntax:**
   - Ensure JSON is valid
   - Check for typos in property names
   - Verify animation values are correct

3. **Verify enabled is true:**
   ```json
   "enabled": true  // Not "enabled": "true" (string)
   ```

### How to Test If Config is Loaded?

Add to a component:
```astro
---
import { viewTransitionsConfig } from "@config/site";
console.log('VT Config:', viewTransitionsConfig);
---
```

Check browser console to see the loaded configuration.

---

## 🔮 Future Enhancements

The current implementation has the config structure in place. Future updates could:

1. **Dynamic Animation Selection:**
   Components automatically use config values instead of hardcoded animations

2. **Per-Route Configuration:**
   Different animations for different sections of the site

3. **Responsive Configuration:**
   Different settings for mobile vs desktop

4. **User Preferences:**
   Allow users to toggle animations via UI

---

## 📚 Related Documentation

- [VIEW_TRANSITIONS_GUIDE.md](./VIEW_TRANSITIONS_GUIDE.md) - Complete guide to view transitions
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation details
- [Astro Docs](https://docs.astro.build/en/guides/view-transitions/) - Official documentation

---

## ✅ Checklist for Configuration Changes

- [ ] Backup current `config.json`
- [ ] Make desired changes
- [ ] Validate JSON syntax
- [ ] Rebuild site (`npm run build`)
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Check performance
- [ ] Deploy to production

---

**Configuration Version:** 1.0
**Last Updated:** 2025
**Astro Version:** v5.12.8
