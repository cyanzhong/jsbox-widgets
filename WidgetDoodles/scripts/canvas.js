const util = require("./util");

const family = {
  small: 0,
  medium: 1,
  large: 2,
}

function present(family) {
  const canvasVC = $objc("WSCanvasVC").$alloc().$initWithFamily(family);
  const navigator = $objc("WSNavigatorVC").$alloc().$initWithRootViewController(canvasVC);
  navigator.$setModalPresentationStyle(0);
  const rootVC = $ui.controller.ocValue();
  rootVC.$presentViewController_animated_completion(navigator, true, null);
}

$define({
  type: "WSCanvasVC: UIViewController<PKToolPickerObserver>",
  props: ["family", "container", "canvas"],
  events: {
    "canBecomeFirstResponder": () => {
      return true;
    },
    "initWithFamily:": family => {
      self = self.$super().$init();
      self.$setFamily(family);
      return self;
    },
    "viewDidLoad": () => {
      self.$super().$viewDidLoad();
      self.$view().$setBackgroundColor($color("#F0F0F0", "#2C2C2E"));

      const container = $objc("UIView").$new();
      container.$layer().$setMasksToBounds(true);
      container.$layer().$setCornerRadius(24);
      container.$layer().$setCornerCurve("continuous");

      self.$view().$addSubview(container);
      self.$setContainer(container);
      self.$resetCanvas();

      const that = self;
      const imageBarItem = (name, action) => {
        const image = $objc("UIImage").$systemImageNamed(name);
        const item = $objc("UIBarButtonItem").$alloc().$initWithImage_style_target_action(image, 0, that, action);
        return item;
      }
      
      const titleBarItem = (title, action) => {
        return $objc("UIBarButtonItem").$alloc().$initWithTitle_style_target_action(title, 0, that, action);
      }

      const shareButton = imageBarItem("square.and.arrow.up", "shareButtonTapped");
      const undoButton = imageBarItem("arrow.uturn.left.circle", "undoButtonTapped");
      const redoButton = imageBarItem("arrow.uturn.right.circle", "redoButtonTapped");
      const rightButtons = NSMutableArray.$new();
      rightButtons.$addObject(shareButton);
      rightButtons.$addObject(redoButton);
      rightButtons.$addObject(undoButton);
      self.$navigationItem().$setRightBarButtonItems(rightButtons);

      const closeButton = titleBarItem($l10n("CLOSE"), "closeButtonTapped");
      const clearButton = titleBarItem($l10n("CLEAR"), "clearButtonTapped");
      const leftButtons = NSMutableArray.$new();
      leftButtons.$addObject(closeButton);
      leftButtons.$addObject(clearButton);
      self.$navigationItem().$setLeftBarButtonItems(leftButtons);
    },
    "viewDidAppear:": animated => {
      self.$super().$viewDidAppear(animated);
      self.$resetToolbar();
    },
    "viewDidLayoutSubviews": () => {
      self.$super().$viewDidLayoutSubviews();
      const maxBounds = self.$view().$bounds();
      const pageWidth = maxBounds.width;
      const pageHeight = maxBounds.height - 76;

      const desiredSize = util.sizeForFamily(self.$family());
      const canvasWidth = desiredSize.width;
      const canvasHeight = desiredSize.height;

      const container = self.$container();
      container.$setFrame({
        "x": (pageWidth - canvasWidth) * 0.5,
        "y": (pageHeight - canvasHeight) * 0.5,
        "width": canvasWidth,
        "height": canvasHeight
      });

      const canvas = self.$canvas();
      canvas.$setFrame(container.$bounds());
    },
    "resetCanvas": () => {
      if (self.$canvas()) {
        self.$canvas().$removeFromSuperview();
      }
      const canvas = $objc("PKCanvasView").$new();
      self.$container().$addSubview(canvas);
      self.$setCanvas(canvas);
      self.$view().$setNeedsLayout();
      self.$view().$layoutIfNeeded();
    },
    "resetToolbar": () => {
      const window = self.$view().$window();
      const picker = $objc("PKToolPicker").$sharedToolPickerForWindow(window);
      self.$setToolbar(picker);

      const canvas = self.$canvas();
      picker.$addObserver(canvas);
      picker.$setVisible_forFirstResponder(true, canvas);
      canvas.$becomeFirstResponder();
    },
    "closeButtonTapped": () => {
      self.$dismissViewControllerAnimated_completion(true, null);
    },
    "clearButtonTapped": () => {
      self.$resetCanvas();
      self.$resetToolbar();
    },
    "undoButtonTapped": () => {
      const manager = self.$canvas().$undoManager();
      if (manager.$canUndo()) {
        manager.$undo();
      }
    },
    "redoButtonTapped": () => {
      const manager = self.$canvas().$undoManager();
      if (manager.$canRedo()) {
        manager.$redo();
      }
    },
    "shareButtonTapped": () => {
      const canvas = self.$canvas();
      const bounds = canvas.$bounds();
      const scale = $device.info.screen.scale;
      const drawing = canvas.$drawing();

      const image = drawing.$imageFromRect_scale(bounds, scale);
      const data = image.jsValue().jpg(0.8);
      $clipboard.text = $text.base64Encode(data);
      $device.taptic(2);

      $ui.alert({
        title: $l10n("COPIED"),
        message: $l10n("LEARN_MORE"),
        actions: [$l10n("OK")]
      });
    }
  }
});

$define({
  type: "WSNavigatorVC: UINavigationController",
  events: {
    "supportedInterfaceOrientations": () => {
      return 2;
    }
  }
});

exports.family = family;
exports.present = present;