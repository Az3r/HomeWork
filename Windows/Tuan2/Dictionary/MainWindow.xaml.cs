using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.IO;
using System.Timers;
using System.Diagnostics;
namespace Dictionary
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Style = (Style) FindResource(typeof(Window));

            RNG = new Random();
            Flags = LoadFlags();
            Countries = LoadCountries();
            System.Diagnostics.Debug.Assert(Flags.Count == Countries.Count, "Number of flags and number of countries does not match");

            Loaded += OnLoaded;

        }
        private void SetRandomCountry()
        {
            int i = RNG.Next(Flags.Count);
            imageFlag.Source = Flags[i];

            // Get country's name from image's file name
            string name = Path.GetFileNameWithoutExtension(Flags[i].UriSource.LocalPath);

            foreach (string[] country in Countries)
            {
                if (country[0] == name)
                {
                    tbEnglish.Text = Countries[i][1];
                    tbVietNam.Text = Countries[i][2];
                    return;
                }
            }
        }
        // Application's events
        protected override void OnClosed(EventArgs e)
        {
            FrameTimer.Dispose();
        }
        private void OnLoaded(object sender, RoutedEventArgs e)
        {
            // Display first country
            SetRandomCountry();

            // Start displaying random country after specific interval
            FrameTimer = new Timer(2000.0);
            FrameTimer.Elapsed += OnNextCountry;
            FrameTimer.Start();
        }
        private void OnPause(object sender, RoutedEventArgs e)
        {
            HasPaused = !HasPaused;
            if (HasPaused) FrameTimer.Stop();
            else FrameTimer.Start();
        }
        private void OnForceNext(object sender, RoutedEventArgs e) => SetRandomCountry();
        private void OnNextCountry(object sender, ElapsedEventArgs e) => Dispatcher.Invoke(() => SetRandomCountry());

        // Loading resources
        protected List<string[]> LoadCountries()
        {
            if (!File.Exists(DictFile)) throw new FileNotFoundException(DictFile);
            List<string[]> list = new List<string[]>();
            string[] lines = File.ReadAllLines(DictFile);
            foreach (string country in lines)
            {
                string[] names = country.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                if (names.Length > 0) list.Add(names);
            }
            return list;
        }
        protected List<BitmapImage> LoadFlags()
        {
            if (!Directory.Exists(FlagsFolder)) throw new DirectoryNotFoundException(FlagsFolder);

            string searchExpression = "*.png";
            List<BitmapImage> list = new List<BitmapImage>();

            foreach (string item in Directory.GetFiles(FlagsFolder, searchExpression, SearchOption.TopDirectoryOnly))
            {
                Uri source = new Uri(Path.Combine(Environment.CurrentDirectory, item));
                list.Add(new BitmapImage(source));
            }

            return list;
        }

        //Resource Files
        private readonly string DictFile = "Resources\\dictionary.txt";
        private readonly string FlagsFolder = "Resources\\Flags";

        //Properties
        private List<BitmapImage> Flags;
        private List<string[]> Countries;
        private Timer FrameTimer;
        private Random RNG;
        private bool HasPaused = false;

    }
}
